interface AddressResponse {
  meta: {
    currentPage: number;
    itemsPerPage: number;
    totalOfItems: number;
    totalOfPages: number;
  };
  result: {
    street: string;
    complement: string;
    district: string;
    districtId: number;
    city: string;
    cityId: number;
    ibgeId: number;
    state: string;
    stateShortname: string;
    zipcode: string;
  };
}
