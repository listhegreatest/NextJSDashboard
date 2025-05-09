import { Suspense } from 'react';
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { fetchInvoicesPages, fetchFilteredInvoices } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// ✅ Just the page-specific title here
export const metadata: Metadata = {
  title: 'Invoices',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  let totalPages: number;
  let invoices: any[];

  try {
    totalPages = await fetchInvoicesPages(query);
    invoices = await fetchFilteredInvoices(query, currentPage);

    if (!invoices || invoices.length === 0) {
      notFound();
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    notFound();
    return null;
  }

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>

      <Suspense fallback={<InvoicesTableSkeleton />}>
        <div className="mt-6">
          <Table invoices={invoices} />
        </div>
      </Suspense>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
