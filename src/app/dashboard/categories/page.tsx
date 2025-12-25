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
import { CategoriesFilters } from '@/components/dashboard/category/categories-filters';
import { CategoriesTable } from '@/components/dashboard/category/categories-table';
import type { Category } from '@/components/dashboard/category/categories-table';

export const metadata = { title: `Categories | Dashboard | ${config.site.name}` } satisfies Metadata;

const categories = [
  {
    id: 'CAT-001',
    name: 'Electronics',
    description: 'Electronic devices and gadgets',
    createdAt: dayjs().subtract(10, 'days').toDate(),
  },
  {
    id: 'CAT-002',
    name: 'Furniture',
    description: 'Home and office furniture',
    createdAt: dayjs().subtract(8, 'days').toDate(),
  },
  {
    id: 'CAT-003',
    name: 'Appliances',
    description: 'Kitchen and household appliances',
    createdAt: dayjs().subtract(6, 'days').toDate(),
  },
  {
    id: 'CAT-004',
    name: 'Sports',
    description: 'Sports equipment and apparel',
    createdAt: dayjs().subtract(4, 'days').toDate(),
  },
  {
    id: 'CAT-005',
    name: 'Books',
    description: 'Books and educational materials',
    createdAt: dayjs().subtract(2, 'days').toDate(),
  },
] satisfies Category[];

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;

  const paginatedCategories = applyPagination(categories, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Categories</Typography>
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
      <CategoriesFilters />
      <CategoriesTable
        count={paginatedCategories.length}
        page={page}
        rows={paginatedCategories}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: Category[], page: number, rowsPerPage: number): Category[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}