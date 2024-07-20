import { defineField } from "sanity";

export const IndividualProject ={
  name: 'individualProject',
  title: 'Individual Project',
  type: 'document',
  fields: [
    defineField({
      name: 'sector',
      title: 'Sector',
      type: 'string',
      options: {
        list: [
          { title: 'Interiors', value: 'interiors' },
          { title: 'Airports', value: 'airports' },
          { title: 'Health Care', value: 'healthcare' },
          { title: 'Institutional', value: 'institutes' },
          { title: 'Judiciary', value: 'judiciary' },
          { title: 'Work Spaces', value: 'workspaces' },
          { title: 'Railways', value: 'railways' },
        ],
      },
    }),
    defineField({
      name: 'projectNumber',
      title: 'Project Number',
      type: 'string',
    }),
    defineField({
      name: 'mainDescription',
      title: 'Main Description',
      type: 'string',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
            },
          ],
        },
      ],
    }),
  ],
}

export default IndividualProject;