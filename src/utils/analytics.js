export function page_view({ title, path }) {
    gtag("config", `${process.env.VUE_APP_GA_ID}`, {
        page_title: title,
        page_path: path,
    });
}  