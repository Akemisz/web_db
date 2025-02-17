"use client"; 
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Layout from '../components/Layout';

interface Produto {
  id: string;
  nome: string;
  categoria: string;
  valor: number;
  estoque: number;
  dt_venci: string;
  dt_fabrica: string;
  marca: string;
  unidadeMedida: string;
  peso_volume: string;
}

const ListarProdutosPage = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar os produtos da API
  const fetchProdutos = async () => {
    try {
      const response = await axios.get('http://localhost:8082/produtos');
      setProdutos(response.data);
      setLoading(false);
    } catch (err) {
      setError('Erro ao buscar produtos da API');
      setLoading(false);
    }
  };

  // Função para excluir produto
  const excluirProduto = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8082/produtos/${id}`);
      setProdutos(produtos.filter(produto => produto.id !== id));
      alert('Produto excluído com sucesso');
    } catch (error) {
      alert('Erro ao excluir produto');
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-800">Lista de Produtos</h1>

        {loading ? (
          <p>Carregando produtos...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <table className="min-w-full mt-4 bg-white border border-gray-200 rounded-md shadow-md">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-gray-500">Nome</th>
                <th className="px-4 py-2 text-left text-gray-500">Categoria</th>
                <th className="px-4 py-2 text-left text-gray-500">Valor</th>
                <th className="px-4 py-2 text-left text-gray-500">Estoque</th>
                <th className="px-4 py-2 text-left text-gray-500">Data de Vencimento</th>
                <th className="px-4 py-2 text-left text-gray-500">Data de Fabricação</th>
                <th className="px-4 py-2 text-left text-gray-500">Marca</th>
                <th className="px-4 py-2 text-left text-gray-500">Unidade de Medida</th>
                <th className="px-4 py-2 text-left text-gray-500">Peso/Volume</th>
                <th className="px-4 py-2 text-left text-gray-500">Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) => (
                <tr key={produto.id} className="border-t">
                  <td className="px-4 py-2">{produto.nome}</td>
                  <td className="px-4 py-2">{produto.categoria}</td>
                  <td className="px-4 py-2">{produto.valor.toFixed(2)}</td>
                  <td className="px-4 py-2">{produto.estoque}</td>
                  <td className="px-4 py-2">{produto.dt_venci}</td>
                  <td className="px-4 py-2">{produto.dt_fabrica}</td>
                  <td className="px-4 py-2">{produto.marca}</td>
                  <td className="px-4 py-2">{produto.unidadeMedida}</td>
                  <td className="px-4 py-2">{produto.peso_volume}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    {/* Link para a página de edição do produto */}
                    <Link href={`/produtos/${produto.id}`} className="text-blue-600 hover:underline">
                      Editar
                    </Link>
                    {/* Botão para excluir o produto */}
                    <button
                      onClick={() => excluirProduto(produto.id)}
                      className="text-red-600 hover:underline"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default ListarProdutosPage;
