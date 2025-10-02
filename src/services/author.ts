import { Author, IAuthor } from '../models/author';
import { AuthorsRepository } from '../repositories/author';
import { log } from '../utils/baseLogger';

export class AuthorService {
    authorsRepository = new AuthorsRepository();

    async getAllAuthors(page:number,limit?:number) {
        try {
            const currentPage = page;
            const pageSize = limit || 3;
            const authors = await this.authorsRepository.findAll(currentPage,pageSize);
            return authors;
    } catch(error){
        throw new Error(`Yazarlar getirilirken hata oluştu: ${error.message}`);
    }}


    async getAuthorById(id:string) {
        const author = await this.authorsRepository.findById(id);
        if(!author) {
            throw new Error('Yazar bulunamadı');
        } 
        return {
            author,
            message: 'Yazar başarıyla getirildi'
        }}
    

        async createAuthor(authorData:IAuthor) {
            try {
                const exist = await this.authorsRepository.findByEmail(authorData.email);
                if(exist) {
                    log.warn('Yazar zaten mevcut', {
                        source: 'author-service',
                        email: authorData.email
                    });
                    throw new Error('bu e mail zaten mevcut');
            }
            const author = await this.authorsRepository.create(authorData);
            log.info('Yazar başarıyla oluşturuldu', {
                source: 'author-service.createAuthor',
                authorId: author._id,
                email: authorData.email
                
            });
            return author;
        }catch(error){
            log.error('Yazar oluşturulurken hata oluştu', {
                source: 'author-service.createAuthor',
                error: error.message
            });
            throw new Error(`Yazar oluşturulurken hata oluştu: ${error.message}`);
        }

}
    async updateAuthor(id:string,authorData:Partial<IAuthor>) {
        try {
            const currentAuthor = await this.authorsRepository.findById(id);
            if(!currentAuthor) {
                log.warn('Yazar bulunamadı',{
                    source: 'author-service.updateAuthor',
                    authorId: id
                });
                
                throw new Error('Yazar bulunamadı');
            }
            if(authorData.email) {
                const exist = await this.authorsRepository.findByEmail(authorData.email);
                if(exist) {
                    log.warn('bu e mail zaten mevcut ',{
                        source: 'author-service.updateAuthor',
                        email: authorData.email
                    });
                    throw new Error('bu e mail zaten mevcut');
                }
                    
            }
            const updateAuthor = await this.authorsRepository.update(id,authorData);
            log.info('Yazar başarıyla güncellendi', {
                source: 'author-service.updateAuthor',
                authorId: id,
                email: authorData.email
            });
            return updateAuthor;
            }catch(error){
                log.error('Yazar güncellenirken hata oluştu', {
                    source: 'author-service.updateAuthor',
                    error: error.message
                });
                throw new Error(`Yazar güncellenirken hata oluştu: ${error.message}`);
            }
        }

        async deleteAuthorById(id:string) {
            try {
                const currenAuthor = await this.authorsRepository.findById(id);
                if(!currenAuthor) {
                    log.warn ('yazar bulunamadı ', {
                        source: 'author-service.deleteAuthorById',
                        authorId: id
                    });
                    throw new Error('verilen id ile yazar bulunamadı');
                }

                // Gerçek silme işlemi
                const deleteResult = await this.authorsRepository.delete(id);
                if (!deleteResult) {
                    throw new Error('Yazar silinirken hata oluştu');
                }

                log.info('yazar başarı ile silindi',{
                    source: 'author-service.deleteAuthorById',
                    authorId: id
                });
                return {
                    success:true,
                    message: 'yazar başarı ile silindi'
                };
            }catch(error){
                log.error('yazar silinirken hata oluştu',{
                    source: 'author-service.deleteAuthorById',
                    error: error.message
                });
                throw new Error(`yazar silinirken hata oluştu: ${error.message}`);
            }
            }
    }
        
 





