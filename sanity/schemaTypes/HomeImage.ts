import { defineField, defineType } from "sanity"

const homeProjectImg = defineType({
    name: 'homeprojectImage',
    title: 'HomeProjectImage',
    type: 'document',
    fields:[
    defineField({
        name: 'heading',
        title: 'Heading',
        type: 'string',
      }),
    defineField({
            name: 'subheading',
            title: 'Subheading',
            type: 'string',
     }),
    defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
     defineField({
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true,
        }
    })
      
    ]
  })

export default homeProjectImg