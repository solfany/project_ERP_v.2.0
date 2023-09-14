package com.project.backend.controller;

import com.project.backend.dto.CalendarEventDto;
import com.project.backend.entity.CalendarEvent;
import com.project.backend.repository.CalendarEventRepository;
import com.project.backend.service.CalendarEventService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CalendarEventControllerTest {

    @InjectMocks
    private CalendarEventController calendarEventController;

    @Mock
    private CalendarEventService calendarEventService;

    @Mock
    private CalendarEventRepository calendarEventRepository;

    @DisplayName("[GET] - 일정 조회 성공 테스트")
    @Test
    public void testGetAllEvents() {
        // Given
        List<CalendarEvent> events = new ArrayList<>();
        events.add(new CalendarEvent());
        events.add(new CalendarEvent());
        when(calendarEventRepository.findAll()).thenReturn(events);
        // When
        List<CalendarEvent> response = calendarEventController.getAllEvents();
        // Then
        assertEquals(events.size(), response.size());

        verify(calendarEventRepository, times(1)).findAll();
    }

    @DisplayName("[POST] - 일정 생성 성공 테스트")
    @Test
    public void testCreateCalendarEventSuccess() throws Exception {
        // Given
        CalendarEventDto calendarEventDto = new CalendarEventDto();
        when(calendarEventService.CreateCalendarEvent(calendarEventDto)).thenReturn(new CalendarEvent());

        // When
        ResponseEntity<String> response = calendarEventController.CreateCalendarEvent(calendarEventDto);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("일정이 성공적으로 저장되었습니다.", response.getBody());

        // Verify that CreateCalendarEvent method was called once
        verify(calendarEventService, times(1)).CreateCalendarEvent(calendarEventDto);
    }

    @DisplayName("[DELETE] - 일정 삭제 성공 테스트")
    @Test
    public void testDeleteCalendarEventSuccess() throws Exception {
        // Given
        Long eventId = 1L;
        when(calendarEventService.DeleteCalendarEvent(eventId)).thenReturn(ResponseEntity.ok("Event deleted successfully"));

        // When
        ResponseEntity<String> response = calendarEventController.deleteCalendarEvent(eventId);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("일정이 성공적으로 삭제되었습니다.", response.getBody());

        //
        verify(calendarEventService, times(1)).DeleteCalendarEvent(eventId);
    }

}
