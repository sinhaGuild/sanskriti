import { ImageMetadata } from "@/store/image-store-slice"

export const PAGINATION_ITEMS_PER_PAGE = 12


interface GetPaginationResponse {
    totalPages: number
    // startIndex: number
    currentImages: ImageMetadata[]

}


export const getPagination = ({ images, currentPage, paginationItemsPerPage }: { images: ImageMetadata[], currentPage: number, paginationItemsPerPage?: number }): GetPaginationResponse => {

    const paginationLimitPerPage = paginationItemsPerPage ? paginationItemsPerPage : PAGINATION_ITEMS_PER_PAGE

    const totalPages = Math.ceil(images.length / paginationLimitPerPage)

    const startIndex = (currentPage - 1) * paginationLimitPerPage;
    const currentImages = images.slice(startIndex, startIndex + paginationLimitPerPage);

    return {
        totalPages,
        currentImages
    }
}