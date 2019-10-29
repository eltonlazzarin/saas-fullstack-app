'use strict';

class ProjectController {
  async index({ request }) {
    const projects = request.team.projects().fetch();

    return projects;
  }

  async store({ request }) {
    const data = request.only(['title']);
    const project = request.team.projects().create(data);

    return project;
  }

  async show({ params, request }) {
    const project = await request.team
      .projects()
      .where('id', params.id)
      .first();

    return project;
  }

  async update({ params, request }) {
    const data = request.only(['title']);
    const project = await request.team
      .projects()
      .where('id', params.id)
      .first();

    project.merge(data);

    await project.save();

    return project;
  }

  async destroy({ params, request }) {
    const project = await request.team
      .projects()
      .where('id', params.id)
      .first();

    await project.delete();
  }
}

module.exports = ProjectController;
