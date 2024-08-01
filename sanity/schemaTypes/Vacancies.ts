
import { defineType, defineField } from 'sanity';

export const jobVacancy = defineType({
  name: 'jobs',
  title: 'Vacancies',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(100)
    }),
    defineField({
        name: 'jobCardDescription',
        title: 'Job Card Description',
        type: 'string',
        validation: (Rule) => Rule.required().min(10).max(50)
      }),
    defineField({
      name: 'description',
      title: 'Job Description',
      type: 'text',
      validation: (Rule) => Rule.required().min(10)
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required()
    })
  ]
});