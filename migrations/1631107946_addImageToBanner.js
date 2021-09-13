const path = require('path')
const { buildModularBlock } = require("datocms-client");

module.exports = async (client) => {
  const bannerBlock = await client.itemTypes.find('banner')

  await client.fields.create(bannerBlock.id, {
    label: 'image',
    apiKey: 'image',
    fieldType: 'file',
  });

  const imagePath = await client.createUploadPath(path.join(__dirname, "./assets/image001.png"));

  const upload = await client.uploads.create({
    path: imagePath,
  });

  const homepages = await client.items.all({filter: {type: 'homepage'}})

  if (homepages.length > 0 && homepages[0].components.length > 0) {
    const component = await client.items.find(homepages[0].components[0])
    await client.items.update(homepages[0].id, {
      components: [buildModularBlock({
        itemType: bannerBlock.id,
        title: component.title,
        description: component.description,
        image: {
          upload_id: upload.id
        }
      })]
    })
  }
}
