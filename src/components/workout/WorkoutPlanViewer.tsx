import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  IconButton
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  FitnessCenter as ExerciseIcon,
  Timer as TimerIcon,
  TimerOff as RestIcon,
  Build as EquipmentIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { WorkoutPlan, Exercise } from '../../types';

interface Props {
  plan: WorkoutPlan;
  onClose?: () => void;
}

const SectionTitle: React.FC<{ title: string; icon: React.ReactNode }> = ({ title, icon }) => (
  <Box display="flex" alignItems="center" mb={1}>
    <Box mr={1} display="flex" alignItems="center">
      {icon}
    </Box>
    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{title}</Typography>
  </Box>
);

const WorkoutPlanViewer: React.FC<Props> = ({ plan, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const renderExerciseCard = (exercise: Exercise, index: number) => (
    <Card key={index} sx={{ mb: 1, borderRadius: 2, boxShadow: 1 }}>
      <CardContent sx={{ '&:last-child': { pb: 2 } }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">{exercise.name}</Typography>
            <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
              {exercise.sets && (
                <Chip
                  size="small"
                  label={`${exercise.sets} sets`}
                  variant="outlined"
                />
              )}
              {exercise.reps && (
                <Chip
                  size="small"
                  label={`${exercise.reps} reps`}
                  variant="outlined"
                />
              )}
              {exercise.rest && (
                <Chip
                  size="small"
                  icon={<RestIcon fontSize="small" />}
                  label={`Rest: ${exercise.rest}`}
                  variant="outlined"
                />
              )}
              {exercise.equipment && (
                <Chip
                  size="small"
                  icon={<EquipmentIcon fontSize="small" />}
                  label={exercise.equipment}
                  variant="outlined"
                />
              )}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box maxWidth={700} mx="auto" my={2} px={isMobile ? 1 : 4} position="relative">
      {onClose && (
        <IconButton 
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            zIndex: 1,
            backgroundColor: 'background.paper',
            '&:hover': {
              backgroundColor: 'action.hover'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
      <Card elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Box sx={{ 
          background: 'linear-gradient(135deg, #3f51b5 0%, #1a237e 100%)',
          color: 'white',
          p: 3,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Typography variant="h5" component="h2" gutterBottom>
            {plan.day} - {plan.workout_type}
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={2} mt={1}>
            <Chip 
              label={plan.focus_area} 
              size="small" 
              sx={{ color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.2)' }} 
            />
            <Chip 
              icon={<TimerIcon fontSize="small" />}
              label={plan.duration}
              size="small"
              sx={{ color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            />
            <Chip 
              label={`Intensity: ${plan.intensity}`} 
              size="small"
              sx={{ color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            />
          </Box>
        </Box>

        <CardContent>
          {/* Warm Up Section */}
          <Box mb={3}>
            <Accordion 
              expanded={expanded === 'warm-up'} 
              onChange={handleChange('warm-up')}
              elevation={0}
              sx={{ '&:before': { display: 'none' } }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <SectionTitle 
                  title="Warm Up" 
                  icon={<TimerIcon color="primary" fontSize="small" />} 
                />
              </AccordionSummary>
              <AccordionDetails>
                <List dense>
                  {plan.warm_up.map((item, idx) => (
                    <ListItem key={idx}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <TimerIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={item.name} secondary={item.duration} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          </Box>

          {/* Main Exercises */}
          <Box mb={3}>
            <SectionTitle 
              title="Main Exercises" 
              icon={<ExerciseIcon color="primary" fontSize="small" />} 
            />
            <Box mt={2}>
              {plan.exercises.map((exercise, idx) => renderExerciseCard(exercise, idx))}
            </Box>
          </Box>

          {/* Cool Down Section */}
          {plan.cool_down.length > 0 && (
            <Box mb={3}>
              <Accordion 
                expanded={expanded === 'cool-down'} 
                onChange={handleChange('cool-down')}
                elevation={0}
                sx={{ '&:before': { display: 'none' }, mt: 2 }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <SectionTitle 
                    title="Cool Down" 
                    icon={<TimerIcon color="primary" fontSize="small" />} 
                  />
                </AccordionSummary>
                <AccordionDetails>
                  <List dense>
                    {plan.cool_down.map((item, idx) => (
                      <ListItem key={idx}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <TimerIcon color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={item.name} secondary={item.duration} />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            </Box>
          )}

          {/* Notes Section */}
          {plan.notes && (
            <Box mt={3}>
              <Accordion 
                expanded={expanded === 'notes'} 
                onChange={handleChange('notes')}
                elevation={0}
                sx={{ '&:before': { display: 'none' }, mt: 2 }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <SectionTitle 
                    title="Workout Notes" 
                    icon={<ExerciseIcon color="primary" fontSize="small" />} 
                  />
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary" whiteSpace="pre-line">
                    {plan.notes}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default WorkoutPlanViewer;
