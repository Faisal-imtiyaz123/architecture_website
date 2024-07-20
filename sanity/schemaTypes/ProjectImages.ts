import {defineField, defineType} from 'sanity'

const projectImages = defineType({
  name: 'projectImages',
  title: 'ProjectImages',
  type: 'document',
  fields: [
    defineField({
      name: 'sector',
      title: 'Sector',
      type: 'string',
      options: {
        list: [
          {title: 'Interiors', value: 'interiors'},
          {title: 'Airports', value: 'airports'},
          {title: 'Health Care', value: 'healthcare'},
          {title: 'Institutional', value: 'institutes'},
          {title: 'Judiciary' , value: 'judiciary'},
          {title: 'Work Spaces', value: 'workspaces'},
          {title: 'Railways', value: 'railways'},
        ],
      },
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}]
    }),
  ],
})

export default projectImages
