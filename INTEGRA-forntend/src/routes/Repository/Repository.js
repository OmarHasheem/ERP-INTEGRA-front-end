import RootLayout from '../../pages/Root';
import ErrorPage from '../../pages/Error';
import { checkAuthLoader, tokenLoader } from '../../hooks/auth';

import SuppliersPage , { loader as SuppliersLoader }from '../../pages/Repository/supplier/Suppliers';
import SupplierDetailPage , {
  loader as SupplierDetailLoader,
  action as deleteSupplierAction
} from '../../pages/Repository/supplier/SupplierDetail';
import EditSupplierPage from '../../pages/Repository/supplier/EditSupplier';
import { action as manipulateSupplierAction } from '../../components/Repository/supplier/SupplierForm';
import NewSupplierPage from '../../pages/Repository/supplier/NewSupplier';


import CategoriesPage , { loader as CategoriesLoader } from '../../pages/Repository/category/Categories';
import NewCategoryPage from '../../pages/Repository/category/NewCategory';
import CategoryDetailPage , {
  loader as CategoryDetailLoader,
  action as deleteCategoryAction
} from '../../pages/Repository/category/CategoryDetail';
import EditCategoryPage from '../../pages/Repository/category/EditCategory';
import { action as manipulateCategoryAction } from '../../components/Repository/category/CategoryForm';

import NewProductPage from '../../pages/Repository/product/NewProduct';
import ProductsPage , { loader as ProductsLoader } from '../../pages/Repository/product/Products';
import ProductDetailPage , {
  loader as ProductDetailLoader,
  action as deleteProductAction
} from '../../pages/Repository/product/ProductDetail';
import EditProductPage from '../../pages/Repository/product/EditProduct';
import { action as manipulateProductAction } from '../../components/Repository/product/ProductForm';

import { productAttribute } from './productAttribute';
import React from 'react';
import NewProductDetail from '../../pages/Repository/product/productDetail/NewProductDetail';
import  { action as manipulateProductDetailAction } from '../../components/Repository/product/productDetail/ProductDetailNewForm';

import EditProductDetailPage, {
  loader as DetailOfProductAttributeLoader
} from '../../pages/Repository/product/productDetail/EditProductDetail';
import { action as EditProductDetailAction } from '../../components/Repository/product/productDetail/ProductDetailEditForm';

import ImportsPage , { loader as ImportsLoader } from '../../pages/Repository/import/Imports';
import NewImportPage from '../../pages/Repository/import/NewImport';
import { action as manipulateImportAction } from '../../components/Repository/import/ImportForm';
import ImportDetailPage, {
  action as deleteImportAction,
  loader as ImportDetailLoader
} from '../../pages/Repository/import/ImportDetail';
import EditImportPage from '../../pages/Repository/import/EditImport';
import AddProductsToImportPage, {
  loader as addProductToImportLoader
} from '../../pages/Repository/import/AddProductsToImport';
import { action as deleteProductOfImport} from '../../components/Repository/import/ImportItem';


import ExportsPage , { loader as ExportsLoader } from '../../pages/Repository/export/Exports';
import NewExportPage from '../../pages/Repository/export/NewExport';
import { action as manipulateExportAction } from '../../components/Repository/export/ExportForm';
import ExportDetailPage, {
  action as deleteExportAction,
  loader as ExportDetailLoader
} from '../../pages/Repository/export/ExportDetail';
import EditExportPage from '../../pages/Repository/export/EditExport';
import AddProductsToExportPage, {
  loader as addProductToExportLoader
} from '../../pages/Repository/export/AddProductsToExport';
import { action as deleteProductOfExport} from '../../components/Repository/export/ExportItem';
import { repositoryLoader } from '../../util/utils';
import PDFsPage, { loader as PDFsLoader } from '../../pages/PDF/PDFs';

export const repositoryRoute = {
  path: '/repository',
  element: <RootLayout />,
  errorElement: <ErrorPage />,
  loader:repositoryLoader,
  children: [
    {
      path: '/repository/suppliers',
      children: [
        {
          index: true,
          element: <SuppliersPage />,
          loader: SuppliersLoader,
        },
        {
          path: '/repository/suppliers/new',
          element: <NewSupplierPage />,
          loader: checkAuthLoader,
          action: manipulateSupplierAction,
        },
        {
          path: '/repository/suppliers/supplier-detail',
          id: 'supplier-detail',
          loader: SupplierDetailLoader,
          children: [
            {
              path: '/repository/suppliers/supplier-detail/:supplierId',
              element: <SupplierDetailPage />,
              action: deleteSupplierAction,
              loader: checkAuthLoader,
            },
            {
              path: '/repository/suppliers/supplier-detail/edit/:supplierId',
              element: <EditSupplierPage />,
              action: manipulateSupplierAction,
              loader: checkAuthLoader,
            },
          ],
        }
      ]
    },
    {
      path: '/repository/categories',
      children: [
        {
          index: true,
          element: <CategoriesPage />,
          loader: CategoriesLoader,
        },
        {
          path: '/repository/categories/new',
          element: <NewCategoryPage />,
          loader: checkAuthLoader,
          action: manipulateCategoryAction,
        },
        {
          path: '/repository/categories/category-detail',
          id: 'category-detail',
          loader: CategoryDetailLoader,
          children: [
            {
              path: '/repository/categories/category-detail/:categoryId',
              element: <CategoryDetailPage />,
              action: deleteCategoryAction,
              loader: checkAuthLoader,
            },
            {
              path: '/repository/categories/category-detail/edit/:categoryId',
              element: <EditCategoryPage />,
              action: manipulateCategoryAction,
              loader: checkAuthLoader,
            },
          ],
        },
      ],
    },
    {
      path: '/repository/products',
      children: [
        {
          index: true,
          element: <ProductsPage />,
          loader: ProductsLoader,
        },
        {
          path: '/repository/products/new',
          children: [
            {
              index: true,
              element: <NewProductPage />,
              loader: checkAuthLoader,
              action: manipulateProductAction,
            },
            {
              path: '/repository/products/new/newDetail/:productId',
              element: <NewProductDetail />,
              loader: checkAuthLoader,
              action: manipulateProductDetailAction,
            },
          ],
        },
        {
          path: '/repository/products/product-detail',
          id: 'product-detail',
          loader: ProductDetailLoader,
          children: [
            {
              path: '/repository/products/product-detail/:productId',
              element: <ProductDetailPage />,
              action: deleteProductAction,
              loader: checkAuthLoader,
            },
            {
              path: '/repository/products/product-detail/edit/:productId',
              element: <EditProductPage />,
              action: manipulateProductAction,
              loader: checkAuthLoader,
            },
          ],
        },
        {
          path: '/repository/products/product-detail/editDetail/:detailId',
          element: <EditProductDetailPage />,
          action: EditProductDetailAction,
          loader: DetailOfProductAttributeLoader,
        },
        productAttribute,
      ],
    },
    {
      path: '/repository/imports',
      children: [
        {
          index: true,
          element: <ImportsPage />,
          loader: ImportsLoader,
        },
        {
          path: '/repository/imports/new',
          element: <NewImportPage />,
          loader: checkAuthLoader,
          action: manipulateImportAction,
        },
        {
          path: '/repository/imports/import-detail',
          id: 'import-detail',
          loader: ImportDetailLoader,
          children: [
            {
              path: '/repository/imports/import-detail/:importId/addProducts',
              element: <AddProductsToImportPage />,
              loader: addProductToImportLoader,
            },
            {
              path: '/repository/imports/import-detail/:importId',
              element: <ImportDetailPage />,
              action: deleteImportAction,
              loader: checkAuthLoader,
              children: [
                {
                  path: '/repository/imports/import-detail/:importId/:productId',
                  action: deleteProductOfImport,
                },
              ],
            },
            {
              path: '/repository/imports/import-detail/edit/:importId',
              element: <EditImportPage />,
              action: manipulateImportAction,
              loader: checkAuthLoader,
            },
          ],
        }
      ]
    },

    {
      path: '/repository/exports',
      children: [
        {
          index: true,
          element: <ExportsPage />,
          loader: ExportsLoader,
        },
        {
          path: '/repository/exports/new',
          element: <NewExportPage />,
          loader: checkAuthLoader,
          action: manipulateExportAction,
        },
        {
          path: '/repository/exports/export-detail',
          id: 'export-detail',
          loader: ExportDetailLoader,
          children: [
            {
              path: '/repository/exports/export-detail/:exportId/addProducts',
              element: <AddProductsToExportPage />,
              loader: addProductToExportLoader,
            },
            {
              path: '/repository/exports/export-detail/:exportId',
              element: <ExportDetailPage />,
              action: deleteExportAction,
              loader: checkAuthLoader,
              children: [
                {
                  path: '/repository/exports/export-detail/:exportId/:productId',
                  action: deleteProductOfExport,
                },
              ]
            },
            {
              path: '/repository/exports/export-detail/edit/:exportId',
              element: <EditExportPage />,
              action: manipulateExportAction,
              loader: checkAuthLoader,
            },
          ],
        }
      ]
    },
    {
      path: '/repository/pdfs',
      children: [
        {
          index: true,
          element: <PDFsPage />,
          loader: PDFsLoader,
        },
      ],
    },
  ],
};
