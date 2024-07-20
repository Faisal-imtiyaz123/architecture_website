import { defineField, defineType } from "sanity"

const homeImg = defineType({
    name: 'homeImages',
    title: 'HomeImages',
    type: 'document',
    fields:[
    defineField({
        name: 'type',
        title: 'Type',
        type: 'string',
        options:{
            list:[
                {title:'MainImage',value:'mainImage'},
                {title:'Other Images',value:'otherImages'},
            ]
        }
      }),
     defineField({
        name: 'images',
        title: 'Images',
        type: 'array',
        of: [{type: 'image', options: {hotspot: true}}],
    })
      
    ]
  })

export default homeImg