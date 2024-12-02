require('dotenv').config()
const express = require('express')
const supabase = require('@supabase/supabase-js')

const app = express()
app.use([express.json(), express.urlencoded({ extended: true })])

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE

const db = supabase.createClient(supabaseUrl, supabaseKey)


app.get('/api', async (req, res) => {
     const getBlogs = await db.from('blog').select().order('id', { ascending: true })
     res.json({
          data: getBlogs.data,
          status: [getBlogs.status, getBlogs.statusText],
     })
})

app.post('/api', async (req, res) => {
     const { title, content } = req.body
     const createBlog = await db.from('blog').insert({ title, content })
     const getBlogs = await db.from('blog').select().order('id', { ascending: true })

     res.json({
          data: getBlogs.data,
          status: [createBlog.status, createBlog.statusText],
     })
})

app.put('/api/:id', async (req, res) => {
     const { id } = req.params
     const { title, content } = req.body
     const updateBlog = await db.from('blog').update({ title, content }).match({ id })
     const getBlogs = await db.from('blog').select().order('id', { ascending: true })

     res.json({
          data: getBlogs.data,
          status: [updateBlog.status, updateBlog.statusText],
     })
})

app.delete('/api/:id', async (req, res) => {
     const { id } = req.params
     const deleteBlog = await db.from('blog').delete().match({ id })
     const getBlogs = await db.from('blog').select().order('id', { ascending: true })

     res.json({
          data: getBlogs.data,
          status: [deleteBlog.status, deleteBlog.statusText],
     })
})

app.listen(3001, () => {
     console.log('Server is running on port 3001')
})