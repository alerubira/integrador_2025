import { TagsData } from "./tagsData.js";
class Tags{
    constructor(idTags,nombreTags){
        this.idTags = idTags;
        this.nombreTags = nombreTags;
    }
    static alta(tags) { 
        return TagsData.altaTags(tags);
    }
    static consulta() {
        return TagsData.consultaTags();
    }
}
export {Tags};