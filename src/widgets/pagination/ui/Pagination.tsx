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
  totalPage: number;
  generateUrl: (page: number) => string;
};

export default function Pagination({totalPage, currentPage, generateUrl}: Props) {
  function renderPageNumbers() {
    if (totalPage === 1) {
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
    const endPage = Math.min(totalPage, startPage + 2);

    if (endPage === totalPage) {
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

    if (endPage < totalPage) {
      items.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    if (currentPage < totalPage - 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink href={generateUrl(totalPage)} isActive={currentPage === totalPage}>
            {totalPage}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return items;
  }

  return (
    <ShadcnPagination>
      <PaginationContent>
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
            aria-disabled={currentPage === totalPage}
            tabIndex={currentPage === totalPage ? -1 : 0}
            className={`${currentPage === totalPage && 'pointer-events-none opacity-50'}`}
          />
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
}
