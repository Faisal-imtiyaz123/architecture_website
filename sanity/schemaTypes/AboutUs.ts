import { defineField, defineType } from "sanity"

const aboutUs = defineType({
    name: 'aboutUsImages',
    title: 'About us',
    type: 'document',
    fields:[
    defineField({
        name: 'type',
        title: 'Type',
        type: 'string',
        options: {
          list: [
            {title: 'Main Image', value: 'mainImage'},
            {title: 'Founding Member Image', value: 'foundingMemberImage'},
          ],
        },
      }),
     defineField({
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true,
        },
    })
      
    ]
  })

export default aboutUs