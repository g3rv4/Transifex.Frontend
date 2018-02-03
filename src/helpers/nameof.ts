export default function nameofFactory<T>() {
    return (name: keyof T): string => name;
};