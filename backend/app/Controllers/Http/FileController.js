'use strict';

const importarPlanoDeContas = require('../../Services/PlanoDeContas');

const Helpers = use('Helpers');

class FileController {
  async store({ request, response }) {
    try {
      if (!request.file('file')) return;

      const upload = request.file('file', { size: '2mb' });

      const fileName = `${Date.now()}.${upload.subtype}`;

      await upload.move(Helpers.tmpPath('uploads'), {
        name: fileName,
      });

      if (!upload.moved()) {
        throw upload.error();
      }

      const pathFile = Helpers.tmpPath('uploads') + '/' + fileName;

      await importarPlanoDeContas(pathFile);
    } catch (error) {
      console.log('FileController - catch(error): ', error);
      return response
        .status(error.status)
        .send({ error: { message: 'File upload error' } });
    }
  }
}

module.exports = FileController;
