'use client';

import {
  ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/shadcnComponent/ui/pagination';

type Props = {
  currentPage: number;
  totalPages: number;
  generateUrl: (page: number) => string;
  className?: string;
};

export default function Pagination({totalPages, currentPage, generateUrl, className}: Props) {
  function renderPageNumbers() {
    if (totalPages === 1) {
      return (
        <PaginationItem key={1}>
          <PaginationLink href={generateUrl(1)} isActive={true}>
            1
          </PaginationLink>
        </PaginationItem>
      );
    }

    const items = [];

    if (currentPage > 2) {
      items.push(
        <PaginationItem key="first">
          <PaginationLink href={generateUrl(1)} isActive={currentPage === 1}>
            1
          </PaginationLink>
        </PaginationItem>,
      );
    }

    let startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + 2);

    if (endPage === totalPages) {
      startPage = Math.max(1, endPage - 2);
    }

    if (startPage > 1) {
      items.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink href={generateUrl(i)} isActive={currentPage === i}>
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    if (endPage < totalPages) {
      items.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    if (currentPage < totalPages - 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink href={generateUrl(totalPages)} isActive={currentPage === totalPages}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return items;
  }

  return (
    <ShadcnPagination>
      <PaginationContent className={className}>
        <PaginationItem>
          <PaginationPrevious
            href={generateUrl(currentPage - 1)}
            aria-disabled={currentPage === 1}
            tabIndex={currentPage === 1 ? -1 : 0}
            className={`${currentPage === 1 && 'pointer-events-none opacity-50'}`}
          />
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem>
          <PaginationNext
            href={generateUrl(currentPage + 1)}
            aria-disabled={currentPage === totalPages}
            tabIndex={currentPage === totalPages ? -1 : 0}
            className={`${currentPage === totalPages && 'pointer-events-none opacity-50'}`}
          />
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
}
