
import { defineField, defineType } from "sanity"
const publication = defineType({
    name: 'publicationImages',
    title: 'Publication Images',
    type: 'document',
    fields:[
    defineField({
        name: 'type',
        title: 'Type',
        type: 'string',
        options: {
          list: [
            {title: 'Main Image', value: 'mainImage'},
            {title: 'Publication Image', value: 'publicationImage'},
          ],
        },
      }),
      defineField({
        name: 'description',
        title: 'Description',
        type: 'string',
      }),
     defineField({
        name: 'image',
        title: 'Image',
        type: 'array',
        of:[
          {type: 'image', options: {hotspot: true}}
        ],
    })
      
    ]
  })

export default publication