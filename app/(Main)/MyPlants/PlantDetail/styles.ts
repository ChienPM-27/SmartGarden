import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        width: '100%',
        height: '90%',
        paddingHorizontal: 16,
        paddingBottom: Platform.OS === 'ios' ? 30 : 16,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 5,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        width: '100%',
    },
    closeButton: {
        padding: 5,
    },
    headerSpacer: {
        width: 24,
    },
    plantName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#166534',
        textAlign: 'center',
        flex: 1,
    },
    scrollView: {
        flex: 1,
        width: '100%',
    },
    scrollContent: {
        paddingBottom: 20,
    },
    imageContainer: {
        marginVertical: 16,
        width: '100%',
        height: 220,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#F3F4F6',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    plantImage: {
        width: '100%',
        height: '100%',
    },
    iconContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E5E7EB',
    },
    imageButtonsContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    imageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
    },
    imageButtonText: {
        color: '#FFFFFF',
        marginLeft: 4,
        fontWeight: '500',
    },
    progressContainer: {
        backgroundColor: '#F0FDF4',
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
    },
    progressStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    progressText: {
        marginLeft: 8,
        fontWeight: '600',
        fontSize: 16,
    },
    infoCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#166534',
        marginBottom: 12,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    infoLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        fontWeight: '500',
        color: '#065F46',
        marginLeft: 8,
        fontSize: 15,
    },
    valueContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    value: {
        color: '#334155',
        textAlign: 'right',
        maxWidth: width * 0.5,
    },
    waterIndicatorContainer: {
        width: 100,
        height: 6,
        backgroundColor: '#E5E7EB',
        borderRadius: 3,
        marginTop: 4,
        overflow: 'hidden',
    },
    waterIndicator: {
        height: '100%',
        backgroundColor: '#0EA5E9',
        borderRadius: 3,
    },
    descriptionCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    descriptionText: {
        color: '#334155',
        lineHeight: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },
    editButton: {
        backgroundColor: '#10B981',
        paddingVertical: 12,
        borderRadius: 8,
        flex: 1,
        marginRight: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButton: {
        backgroundColor: '#F43F5E',
        paddingVertical: 12,
        borderRadius: 8,
        flex: 1,
        marginLeft: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmDeleteButton: {
        backgroundColor: '#DC2626',
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
        marginLeft: 6,
        fontSize: 15,
    },
});

export default styles;
