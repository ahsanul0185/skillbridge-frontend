// [
//   {
//     title: "User Management",
//     url: "#",
//     items: [
//       {
//         title: "Analytics",
//         url: "/analytics",
//       },
//       {
//         title: "Banned Users",
//         url: "/banned-users",
//       },
//     ],
//   },
// ];

export interface Route {
    title : string;
    url : string;
    items : {
        title : string, 
        url : string;
    }[];
}