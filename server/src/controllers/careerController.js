import * as careerService from '../services/careerService.js';

export async function listJobs(req, res) {
  const data = await careerService.listJobs();
  res.json({ success: true, count: data.length, data });
}

export async function getJob(req, res) {
  res.json({ success: true, data: await careerService.getJob(req.params.id) });
}

export async function applyForJob(req, res) {
  if (req.body?.company_website) {
    return res.status(201).json({ success: true, message: 'Your application has been submitted successfully. Thank you for applying.' }); // honeypot
  }
  const result = await careerService.submitApplication(req.params.id, req.body, req.file);
  res.status(201).json({ success: true, ...result });
}
