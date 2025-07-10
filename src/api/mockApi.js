// /src/api/mockApi.js

const mockData = {
  'NSMPSB844KFGU': {
    code: 'NSMPSB844KFGU',
    status: 'Em Trânsito',
    previsaoEntrega: '04/07/2025', // <-- NOVO
    history: [
      { date: '28/06/2025, 11:39', status: 'Em Rota de Transferência', local: 'Campina/SP' },
      { date: '28/06/2025, 10:55', status: 'Pedido Coletado', local: 'Guarulhos/SP' },
      { date: '25/06/2025, 22:39', status: 'Pedido Recebido/Confirmado', local: '' },
    ],
  },
  'OUTROCODIGO123': {
    code: 'OUTROCODIGO123',
    status: 'Entregue',
    previsaoEntrega: '02/07/2025', // <-- NOVO
     history: [
      { date: '02/07/2025, 14:00', status: 'Objeto entregue ao destinatário', local: 'Cidade de Destino/UF' },
      { date: '02/07/2025, 09:15', status: 'Objeto saiu para entrega ao destinatário', local: 'Centro de Distribuição/UF' },
      { date: '01/07/2025, 18:20', status: 'Em Rota de Transferência', local: 'Hub de Transferência/SP' },
      { date: '30/06/2025, 11:00', status: 'Pedido Coletado', local: 'Guarulhos/SP' },
    ],
  }
};

export const fetchTrackingData = (trackingCode) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mockData[trackingCode]) {
        resolve(mockData[trackingCode]);
      } else {
        reject(new Error('Código de rastreio não encontrado.'));
      }
    }, 1000);
  });
};