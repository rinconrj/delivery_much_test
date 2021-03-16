import * as service from './productService'

export async function getProductById(req, res) {
  const { id } = req.params
  return service.getProductById(id).then((data) => res.json(data))
}

export async function getProducts(req, res) {
  return service.fetchAllProducts().then((data) => res.json(data))
}

export async function addProduct(req, res) {
  const { body } = req
  return service
    .createProduct(body)
    .then((data) => res.json(data))
    .catch((e) => {
      if (e.message === 'missing_params') {
        return res.status(404).message(e.message)
      }
      return res.status(500).message(e.message)
    })
}

export async function importProducts(req, res) {
  const { file } = req.files
  if (!file) return res.status(404).json({ message: 'missing file' })

  return service.importProductsFromCsv(file).then((data) => res.json(data))
}

export async function updateProduct(req, res) {
  const {
    body,
    params: { id },
  } = req
  return service.updateProduct(id, body).then((data) => res.json(data))
}

export async function deleteProduct(req, res) {
  const { id } = req.params
  return service.deleteProduct(id).then((data) => res.json(data))
}
