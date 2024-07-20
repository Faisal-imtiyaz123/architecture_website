import { defineField, defineType } from "sanity"

const careers = defineType({
    name: 'careers',
    title: 'Careers',
    type: 'document',
    fields:[
    defineField({
        name: 'description',
        title: 'Description',
        type: 'string',
      }),
      defineField({
        name: 'bulletPoints',
        title: 'Bullet Points',
        type: 'string',
      }),
      
    ]
  })

export default careers