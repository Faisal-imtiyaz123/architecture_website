import { defineField, defineType } from "sanity";

const homeImg = defineType({
  name: 'homeImages',
  title: 'HomeImages',
  type: 'document',
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'MainImage', value: 'mainImage' },
          { title: 'Other Images', value: 'otherImages' },
          {title:'Carousel Images', value: 'carouselImages'}
        ]
      }
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
    })
  ]
});

export default homeImg;
