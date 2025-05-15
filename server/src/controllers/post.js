import * as postService from '../services/post'

export const getPosts = async (req, res) => {
    try {
        const response = await postService.getPostsService()
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller: ' + error
        })
    }
}
export const getPostsLimit = async (req, res) => {
    const { page, priceNumber, areaNumber, ...query } = req.query
    try {
        const response = await postService.getPostsLimitService(page, query, { priceNumber, areaNumber })
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller: ' + error
        })
    }
}
export const getNewPosts = async (req, res) => {
    try {
        const response = await postService.getNewPostService()
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller: ' + error
        })
    }
}
export const createPost = async (req, res) => {
    try {
        const response = await postService.createPostService(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at createPost controller: ' + error
        })
    }
}

export const getPostsByUser = async (req, res) => {
    const { id } = req.user
    try {
        const response = await postService.getPostsByUserService(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at getPostsByUser controller: ' + error
        })
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params
    const payload = req.body
    try {
        const response = await postService.updatePostService(id, payload)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at updatePost controller: ' + error
        })
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params
    try {
        const response = await postService.deletePostService(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at deletePost controller: ' + error
        })
    }
}