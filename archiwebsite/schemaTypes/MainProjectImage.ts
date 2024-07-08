import { defineField, defineType } from "sanity"

const mainProjectImage = defineType({
    name: "mainProjectImage",
    title: "MainProjectImage",
    type: "document",
    fields: [
     defineField( {
        name: "image",
        title:"Image",
        type: "image",
        options: { hotspot: true },
      }),
     defineField({
        name: "text",
        type: "text",
        title: "Description",
      }),
    ],
  })

export default mainProjectImage