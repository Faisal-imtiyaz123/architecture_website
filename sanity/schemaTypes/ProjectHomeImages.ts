import { defineField, defineType } from "sanity"

const ProjectHomeImages = defineType({
    name: 'projectHomeImages',
    title: 'ProjectHomeImages',
    type: 'document',
    fields:[
    defineField({
        name: 'sector',
        title: 'Sector',
        type: 'string',
        options: {
          list: [
            {title: 'Interiors', value: 'interiors'},
            {title: 'Airports', value: 'airports'},
            {title: 'Health Care', value: 'h'},
            {title: 'Institutional', value: 'institutes'},
            {title: 'Judiciary' , value: 'judiciary'},
            {title: 'Work Spaces', value: 'workspaces'},
            {title: 'Railways', value: 'railways'},
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

export default ProjectHomeImages