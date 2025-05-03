import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'potion',
  title: 'Potion',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'effects',
      title: 'Effects',
      type: 'text',
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
    }),
    defineField({
      name: 'baseLiquid',
      title: 'Base Liquid',
      type: 'string',
    }),
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      type: 'text',
    }),
    defineField({
      name: 'steps',
      title: 'Brewing Steps',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'effects',
    },
  },
})