import { Input } from "@nextui-org/input"
import { Button } from "@nextui-org/react"
import { X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod"
import { sanityClient } from "../utils/client";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
export default function Careers() {
  const formSchema = z.object({
    fullName: z.string().min(1, { message: "Full Name is required" }).max(100, { message: "Full Name must be less than 100 characters" }),
    email: z.string().email({ message: "Invalid email format" }),
    phoneNumber: z.string().min(10, { message: "Phone Number must be at least 10 digits" }).max(15, { message: "Phone Number must be less than 15 digits" }),
  });
  const {register,handleSubmit,formState:{errors}} = useForm({
    resolver: zodResolver(formSchema)
  })
  const [selectedFile, setSelectedFile] = useState<File|null>(null);
  const uploadMutation = useMutation({
    onMutate:()=>toast.loading('Uploading data...'),
    onError:()=>{
      toast.dismiss()
      toast.error('Upload failed')
    },
    onSuccess:()=>{
      toast.dismiss()
      toast.success('Upload successful')
    },
    mutationFn:async (values:z.infer<typeof formSchema>)=>{
      if (selectedFile) {
        try {
          // Upload the file to Sanity
          const fileAsset = await sanityClient.assets.upload('file', selectedFile, {
            filename: selectedFile.name,
          });
    
          // Create a document that references the uploaded file
          const doc = {
            _type: 'application',
            fullName: values.fullName,
            email: values.email,
            phoneNumber: values.phoneNumber,
            resume: {
              _type: 'file',
              asset: {
                _type: 'reference',
                _ref: fileAsset._id,
              },
            },
          };
    
          await sanityClient.create(doc);
          toast.success('Form and file uploaded successfully');
        } catch (err:any) {
          toast.error('Upload failed', err.message);
        }
      }
    }
  })
  const formFields =[
    {
      label: 'Full Name',
      type: 'text',
      tag:"fullName"
    },
    {
      label: 'Email',
      type: 'email',
      tag:"email"
    },
    {
      label: 'Phone Number',
      type: 'tel',
      tag:"phoneNumber"
    }
  ]
  const handleFileChange = (e:any) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };
  const onSubmit = async (values:z.infer<typeof formSchema>)=>{
    if(!selectedFile) {toast.error('Please upload resume')
    return
    }
    const existingApplicationsQuery = `*[_type == "application" && email == $email][0]`;
      const existingApplication = await sanityClient.fetch(existingApplicationsQuery, { email: values.email });
      if (existingApplication) {
        toast.error('Application already exists');
        return
     }
    uploadMutation.mutate(values)

  }
  return (
    <div className="p-16 mt-20 flex gap-8">
      <p className="basis-[50%] pr-16 border-r ">
      In the heart of a bustling metropolis, nestled amidst towering skyscrapers and the ceaseless hum of urban life, lay a hidden haven known as Elmwood Park. Unlike the concrete jungle that surrounded it, Elmwood was a sanctuary of emerald green, a tapestry of winding paths and ancient oaks that whispered secrets on the breeze. Here, time seemed to slow its relentless pace, replaced by the gentle rustle of leaves and the melodic chirping of unseen birds.

      One crisp autumn morning, the park was bathed in a golden glow. Sunlight filtered through the canopy, dappling the ground with a mosaic of light and shadow. A young woman named Amelia, with auburn hair cascading down her shoulders and eyes the color of the summer sky, strolled along a secluded path. Lost in a book, she barely noticed the world around her, her brow furrowed in concentration.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col formBorder gap-8 p-6 border rounded-xl w-[30rem]  ">
        {formFields.map((field,i)=>
           <Input errorMessage={errors[field.tag]?.message as string} isInvalid={errors[field.tag]?true:false}  isRequired {...register(field.tag)} key={i} type={field.type} label={field.label} />
        )
        }
       <div>
        {selectedFile?
         <Button  radius="lg" className="bg-white border p-8 border-dashed border-blue-400 text-xl cursor-pointer w-full text-blue-600 ">
           <span className="flex gap-1 items-center">
             {selectedFile.name}
             <div onClick={handleRemoveFile} className="mt-1">
             <X size={16}/>
             </div>
           </span>
          </Button>:
        <label className="w-full" htmlFor="uploadBtn">
        <Button  radius="lg" className="bg-white border p-8 border-dashed border-blue-400 text-xl cursor-pointer w-full text-blue-600 ">
        <input onChange={(e)=>handleFileChange(e)} id="uploadBtn" className="opacity-0 absolute " type="file" accept=".pdf,.docx" />
        Upload Resume
        </Button>
        </label>}
       </div>
       <Button className="bg-gradient-to-tr text-xl p-8 from-pink-500 to-yellow-500 text-white shadow-lg " color="danger" radius="lg" type="submit">
        Submit
       </Button>
      </form>

    </div>
  )
}
