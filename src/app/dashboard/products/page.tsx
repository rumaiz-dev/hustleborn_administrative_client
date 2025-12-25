import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';

import { config } from '@/config';
import { ProductsFilters } from '@/components/dashboard/product/products-filters';
import { ProductsTable } from '@/components/dashboard/product/products-table';
import type { Product } from '@/components/dashboard/product/products-table';

export const metadata = { title: `Products | Dashboard | ${config.site.name}` } satisfies Metadata;

const products = [
  {
    id: 'PRD-001',
    name: 'Ergonomic Chair',
    description: 'Comfortable office chair with lumbar support',
    price: 299.99,
    category: 'Furniture',
    image: '/assets/product-1.png',
    createdAt: dayjs().subtract(5, 'days').toDate(),
  },
  {
    id: 'PRD-002',
    name: 'Wireless Keyboard',
    description: 'Mechanical keyboard with RGB lighting',
    price: 149.99,
    category: 'Electronics',
    image: '/assets/product-2.png',
    createdAt: dayjs().subtract(3, 'days').toDate(),
  },
  {
    id: 'PRD-003',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe',
    price: 89.99,
    category: 'Appliances',
    image: '/assets/product-3.png',
    createdAt: dayjs().subtract(7, 'days').toDate(),
  },
  {
    id: 'PRD-004',
    name: 'Running Shoes',
    description: 'Lightweight running shoes for all terrains',
    price: 129.99,
    category: 'Sports',
    image: '/assets/product-4.png',
    createdAt: dayjs().subtract(2, 'days').toDate(),
  },
  {
    id: 'PRD-005',
    name: 'Smart Watch',
    description: 'Fitness tracking smartwatch with heart rate monitor',
    price: 249.99,
    category: 'Electronics',
    image: '/assets/product-5.png',
    createdAt: dayjs().subtract(1, 'day').toDate(),
  },
] satisfies Product[];

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;

  const paginatedProducts = applyPagination(products, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Products</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </div>
      </Stack>
      <ProductsFilters />
      <ProductsTable
        count={paginatedProducts.length}
        page={page}
        rows={paginatedProducts}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: Product[], page: number, rowsPerPage: number): Product[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}