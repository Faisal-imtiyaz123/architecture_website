import { defineField, defineType } from "sanity"

const carouselImg = defineType({
    name: 'carouselImage',
    title: 'CarouselImages',
    type: 'document',
    fields:[
      defineField({
         name: 'image',
         title: 'Image',
         type: 'image',
         options: {
           hotspot: true,
         }
     }),
    defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
    ]
  })

export default carouselImg