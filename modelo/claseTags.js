import { TagsData } from "./tagsData";
class Tags{
    contructor(nombreTags){
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