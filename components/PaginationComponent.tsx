"use client"

import { Dispatch, SetStateAction } from "react"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination"

interface PaginationComponentProps {
    currentPage: number
    totalPages: number
    setCurrentPage: Dispatch<SetStateAction<number>>
}

const PaginationComponent = ({ currentPage, totalPages, setCurrentPage }: PaginationComponentProps) => {

    // Function to generate pagination items
    const renderPaginationItems = () => {
        const items = [];

        if (totalPages <= 5) {
            // If total pages are less than or equal to max visible pages, show all
            for (let i = 1; i <= totalPages; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            href="#"
                            isActive={currentPage === i}
                            onClick={() => setCurrentPage(i)}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        } else {
            // Show first page
            items.push(
                <PaginationItem key={1}>
                    <PaginationLink
                        href="#"
                        isActive={currentPage === 1}
                        onClick={() => setCurrentPage(1)}
                    >
                        1
                    </PaginationLink>
                </PaginationItem>
            );

            // Show ellipsis if needed
            if (currentPage > 3) {
                items.push(<PaginationEllipsis key="ellipsis-start" />);
            }

            // Show pages around the current page
            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            href="#"
                            isActive={currentPage === i}
                            onClick={() => setCurrentPage(i)}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }

            // Show ellipsis if needed
            if (currentPage < totalPages - 2) {
                items.push(<PaginationEllipsis key="ellipsis-end" />);
            }

            // Show last page
            items.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink
                        href="#"
                        isActive={currentPage === totalPages}
                        onClick={() => setCurrentPage(totalPages)}
                    >
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return items;
    };


    return (
        <>
            <Pagination className="pt-10">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        />
                    </PaginationItem>
                    {/* {Array.from({ length: totalPages }, (_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink
                                href="#"
                                isActive={currentPage === index + 1}
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))} */}
                    {renderPaginationItems()}
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
            <div className="h-48"></div>
        </>
    )

}


export default PaginationComponent