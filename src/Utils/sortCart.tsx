export const SortCart = (item: any) => {
  item?.sort(function (a, b) {
    var dateA: any = new Date(a.createdAt),
      dateB: any = new Date(b.createdAt);
    return dateB - dateA;
  });
};
