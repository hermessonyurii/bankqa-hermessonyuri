describe('API Healthcheck', () => {
  it('should return API health status successfully', () => {
    cy.request('/api/health').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq('ok');
      expect(response.body.project).to.eq('bankqa-hermessonyuri-portfolio');
    });
  });
});
