import { Navigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '../api/SebaLibrosAPI';
import AdminView from '../components/AdminView';
import { useEffect } from 'react';


export default function AdminLayout() {


    const { data, isLoading, isError, refetch } = useQuery({
        queryFn: getUser,
        queryKey: ['user'],
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        retry: 0,
        staleTime: Infinity,
    })

    const location = useLocation();

    useEffect(() => {
        if (location.pathname.startsWith('/admin')) {
            refetch();
        }
    }, [location.key, location.pathname, refetch]);

    if (isLoading) return 'Loading...'
    if (isError) return <Navigate to={'/login'} />
    if (data) return <AdminView data={data} />

}
