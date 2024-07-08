import { defineField, defineType } from "sanity"


const projectImage = defineType({
    name: "projectImage",
    title: "ProjectImage",
    type: "document",
    fields: [
      defineField({
        name: "image",
        title:"Image",
        type: "image",
        options: { hotspot: true },
      }),
      defineField({
        name: "text",
        type: "text",
        title: "Optional Text",
      }),
    ],
  })

export default projectImage