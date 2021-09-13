const { buildModularBlock } = require("datocms-client");

module.exports = async (client) => {
  // DatoCMS migration script

  // For more examples, head to our Content Management API docs:
  // https://www.datocms.com/docs/content-management-api

  const bannerBlock = await client.itemTypes.create({
    name: 'Banner',
    apiKey: 'banner',
    modularBlock: true,
  });
  await client.fields.create(bannerBlock.id, {
    label: 'Title',
    apiKey: 'title',
    fieldType: 'string',
  });
  await client.fields.create(bannerBlock.id, {
    label: 'Description',
    apiKey: 'description',
    fieldType: 'string',
  });


  // Create an Article model:
  // https://www.datocms.com/docs/content-management-api/resources/item-type/create
  const homepageModel = await client.itemTypes.create({
    name: 'Homepage',
    apiKey: 'homepage',
    singleton: true,
  });
  await client.fields.create(homepageModel.id, {
    label: 'components',
    apiKey: 'components',
    fieldType: 'rich_text',
    validators: {
      rich_text_blocks: {
        itemTypes: [bannerBlock.id]
      },
    },
  });

  await client.items.create({
    itemType: homepageModel.id,
    components: [buildModularBlock({
      itemType: bannerBlock.id,
      title: 'Titre',
      description: 'Description'
    })]
  });
}
