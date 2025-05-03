// deskStructure.ts
import {StructureBuilder} from 'sanity/desk'
import {CogIcon} from '@sanity/icons'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Regular document types
      S.listItem()
        .title('Posts')
        .schemaType('post')
        .child(S.documentTypeList('post').title('Posts')),
      S.listItem()
        .title('Authors')
        .schemaType('author')
        .child(S.documentTypeList('author').title('Authors')),
      S.listItem()
        .title('Categories')
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories')),
      
      // Custom structure for potions
      S.listItem()
        .title('Potions')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Potions')
            .items([
              S.listItem()
                .title('All Potions')
                .schemaType('potion')
                .child(S.documentTypeList('potion').title('All Potions')),
              // You could add more filtered views here, e.g.:
              S.listItem()
                .title('Healing Potions')
                .child(
                  S.documentTypeList('potion')
                    .title('Healing Potions')
                    .filter('_type == "potion" && effects match "*heal*"')
                ),
            ])
        ),
    ])