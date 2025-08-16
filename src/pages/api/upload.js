import cloudinary from '../../../lib/cloudinary';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = formidable({});
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: 'Error parsing the form data.' });
        return;
      }

      try {
        const filesToUpload = Array.isArray(files.file) ? files.file : [files.file];
        const urls = await Promise.all(
          filesToUpload.map((file) =>
            cloudinary.uploader.upload(file.filepath, {
              folder: 'crosseye website data',
            }).then((result) => result.secure_url)
          )
        );
        res.status(200).json({ urls });
      } catch (error) {
        console.error('Cloudinary Upload Error:', error);
        res.status(500).json({ error: 'Error uploading the image.' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
