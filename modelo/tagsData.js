import{ consulta1 } from './conexxionBD.js';
class TagsData{
    static altaTags(tags) {
        let query = 'INSERT INTO `tags` (`nombre_tags`) VALUES (?)';
        return consulta1(query, tags.nombreTags);
    }
    static consultaTags() {
        let query = 'SELECT * FROM `tags` WHERE 1';
        return consulta1(query);
    }
}
export { TagsData };