import { defineField, defineType } from "sanity"

const aboutUsCarousel = defineType({
    name: 'aboutUsCarouselImages',
    title: 'About us Carousel',
    type: 'document',
    fields:[
    defineField({
        name: 'type',
        title: 'Type',
        type: 'string',
        options: {
          list: [
            {title: 'Team', value: 'team'},
            {title: 'Awards', value: 'awards'},
            {title: 'Clients', value: 'clients'},
          ],
        },
      }),
      defineField({
        name: 'images',
        title: 'Images',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              defineField({
                name: 'image',
                title: 'Image',
                type: 'image',
                options: { hotspot: true }
              }),
              defineField({
                name: 'description',
                title: 'Description',
                type: 'string'
              })
            ]
          }
        ]
      }),
    ],
  })

export default aboutUsCarousel