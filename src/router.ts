import { Router } from 'express'
import { body, param } from 'express-validator'
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product'
import { handlersInputErrors } from './middleware'

const router = Router()

router.get('/', getProducts)
router.get('/:id',

    param('id').isInt().withMessage("ID no valido"),
    handlersInputErrors,
    getProductById
)


router.post('/',

    //validacion se puede anidar condiciones
    body('name')
        .notEmpty().withMessage("EL nombre del producto no puede ir vacio"),

    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage("EL precio del producto no puede ir vacio")
        .custom(value => value > 0).withMessage("Precio no valido"),

    handlersInputErrors,
    createProduct
)

router.put('/:id',
    param('id').isInt().withMessage('ID no válido'),
    body('name')
        .notEmpty().withMessage('El nombre de Producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio de Producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no válido'),
    body('availability')
        .isBoolean().withMessage('Valor para disponibilidad no válido'),
    handlersInputErrors,
    updateProduct
)

router.patch('/:id',
    param('id').isInt().withMessage('ID no válido'),
    handlersInputErrors,
    updateAvailability
)

router.delete('/:id',
    param('id').isInt().withMessage('ID no válido'),
    handlersInputErrors,
    deleteProduct
)


export default router