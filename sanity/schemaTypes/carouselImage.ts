import { defineField, defineType } from "sanity"

const carouselImg = defineType({
    name: 'carouselImage',
    title: 'CarouselImages',
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

export default carouselImg