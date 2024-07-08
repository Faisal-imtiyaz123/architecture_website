import { defineField, defineType } from "sanity"

const homeImg = defineType({
    name: 'homeImage',
    title: 'HomeImage',
    type: 'document',
    fields:[
    defineField({
        name: 'heading',
        title: 'Heading',
        type: 'string',
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

export default homeImg