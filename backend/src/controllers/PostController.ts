import { Request, Response } from 'express';
import { PostService } from '../services/PostService';
import { successHandler, errorHandler } from '../utils/responseHandler';

export class PostController {
  // GET /posts — danh sách bài published (dành cho frontend)
  static async getAllPulishedPost(request: Request, response: Response) {
    try {
      const posts = await PostService.getAllPublishedPost();
      return response.json(successHandler(200, 'Lấy danh sách bài viết thành công', posts));
    } catch (error) {
      return response.json(errorHandler(500, 'Lỗi khi lấy danh sách bài viết'));
    }
  }

  // GET /posts/admin — danh sách tất cả bài (dành cho admin)
  static async getAllPost(request: Request, response: Response) {
    try {
      const posts = await PostService.getAllPost();
      return response.json(successHandler(200, 'Lấy danh sách bài viết thành công', posts));
    } catch (error) {
      return response.json(errorHandler(500, 'Lỗi khi lấy danh sách bài viết'));
    }
  }

  // GET /posts/:slug — chi tiết bài viết theo slug (dành cho frontend)
  static async getBySlug(request: Request, response: Response) {
    const { slug } = request.params.slug as any;
    try {
      const post = await PostService.getBySlug(slug);
      if (!post) {
        return response.json(errorHandler(404, 'Bài viết không tồn tại'));
      }
      return response.json(successHandler(200, 'Lấy bài viết thành công', post));
    } catch (error) {
      return response.json(errorHandler(500, 'Lỗi khi lấy bài viết'));
    }
  }

  static async createPost(request: Request, response: Response) {
    const postData = {
      ...request.body,
      thumbnailUrl: request.file?.path,
    };
    try {
      const newPost = await PostService.createPost(postData);
      return response.json(successHandler(201, 'Tạo bài viết thành công', newPost));
    } catch (error) {
      return response.json(errorHandler(500, 'Lỗi khi tạo bài viết'));
    }
  }

  static async updatePost(request: Request, response: Response) {
    const postId = Number(request.params.id);
    const postData = {
      ...request.body,
      ...(request.file && { thumbnailUrl: request.file.path }),
    };
    try {
      const updatedPost = await PostService.updatePost(postId, postData);
      return response.json(successHandler(200, 'Cập nhật bài viết thành công', updatedPost));
    } catch (error) {
      return response.json(errorHandler(500, 'Lỗi khi cập nhật bài viết'));
    }
  }

  static async deletePost(request: Request, response: Response) {
    const postId = Number(request.params.id);
    try {
      await PostService.deletePost(postId);
      return response.json(successHandler(200, 'Xóa bài viết thành công'));
    } catch (error) {
      return response.json(errorHandler(500, 'Lỗi khi xóa bài viết'));
    }
  }
}