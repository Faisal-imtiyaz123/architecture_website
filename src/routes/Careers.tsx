import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { sanityClient } from "../utils/client";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

interface Props {
  description: string;
  requirements: string[];
}

export default function Careers(props: Props) {
  const formSchema = z.object({
    fullName: z
      .string()
      .min(1, { message: "Full Name is required" })
      .max(100, { message: "Full Name must be less than 100 characters" }),
    email: z.string().email({ message: "Invalid email format" }),
    phoneNumber: z
      .string()
      .min(10, { message: "Phone Number must be at least 10 digits" })
      .max(15, { message: "Phone Number must be less than 15 digits" }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
    },
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const uploadMutation = useMutation({
    onMutate: () => toast.loading("Uploading data..."),
    onError: () => {
      toast.dismiss();
      toast.error("Upload failed");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Upload successful");
    },
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      if (selectedFile) {
        try {
          // Upload the file to Sanity
          const fileAsset = await sanityClient.assets.upload(
            "file",
            selectedFile,
            {
              filename: selectedFile.name,
            }
          );

          // Create a document that references the uploaded file
          const doc = {
            _type: "application",
            fullName: values.fullName,
            email: values.email,
            phoneNumber: values.phoneNumber,
            resume: {
              _type: "file",
              asset: {
                _type: "reference",
                _ref: fileAsset._id,
              },
            },
          };

          await sanityClient.create(doc);
          toast.success("Form and file uploaded successfully");
        } catch (err: any) {
          toast.error("Upload failed", err.message);
        }
      }
    },
  });
  const formFields = [
    {
      label: "Full Name",
      type: "text",
      tag: "fullName",
    },
    {
      label: "Email",
      type: "email",
      tag: "email",
    },
    {
      label: "Phone Number",
      type: "tel",
      tag: "phoneNumber",
    },
  ];
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!selectedFile) {
      toast.error("Please upload resume");
      return;
    }
    const existingApplicationsQuery = `*[_type == "application" && email == $email][0]`;
    const existingApplication = await sanityClient.fetch(
      existingApplicationsQuery,
      { email: values.email }
    );
    if (existingApplication) {
      toast.error("Application already exists");
      return;
    }
    uploadMutation.mutate(values);
  };
  return (
    <div className="p-16 mt-20 max-h-[80vh] lg:max-h-[90vh] flex gap-8">
      <div className="basis-[50%] flex flex-col gap-8  pr-16 border-r ">
        <div>{props.description}</div>
        <div className="">
          {props.requirements
            .map((bulletPoint: string, i: number) => (
              <div key={i} className="flex items-center gap-4">
                <div className="rounded-full w-2 h-2 blue-gradient"></div>
                {bulletPoint}
              </div>
            ))}
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col formBorder gap-8 p-6 border rounded-xl w-[30rem]  "
      >
        {formFields.map((field, i) => (
          <Input
            errorMessage={
              errors[field.tag as keyof z.infer<typeof formSchema>]
                ?.message as string
            }
            isInvalid={
              errors[field.tag as keyof z.infer<typeof formSchema>]
                ? true
                : false
            }
            isRequired
            {...register(field.tag as keyof z.infer<typeof formSchema>)}
            key={i}
            type={field.type}
            label={field.label}
          />
        ))}
        <div>
          {selectedFile ? (
            <Button
              radius="lg"
              className="bg-white border p-8 border-dashed border-blue-400 text-xl cursor-pointer w-full text-blue-600 "
            >
              <span className="flex gap-1 items-center">
                {selectedFile.name}
                <div onClick={handleRemoveFile} className="mt-1">
                  <X size={16} />
                </div>
              </span>
            </Button>
          ) : (
            <label className="w-full" htmlFor="uploadBtn">
              <Button
                radius="lg"
                className="bg-white border p-8 border-dashed border-blue-400 text-xl cursor-pointer w-full text-blue-600 "
              >
                <input
                  onChange={(e) => handleFileChange(e)}
                  id="uploadBtn"
                  className="opacity-0 absolute "
                  type="file"
                  accept=".pdf,.docx"
                />
                Upload Resume
              </Button>
            </label>
          )}
        </div>
        <Button
          className="bg-gradient-to-tr text-xl p-8 blue-gradient text-white shadow-lg "
          color="danger"
          radius="lg"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
